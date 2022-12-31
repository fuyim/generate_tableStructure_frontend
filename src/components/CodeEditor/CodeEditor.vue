<template>
  <div id="codeEditBox" :style="'height:' + heights + 'px'"></div>
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor";
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { language as sqlLanguage } from "monaco-editor/esm/vs/basic-languages/sql/sql.js";
import { nextTick, ref, onBeforeUnmount, onMounted, reactive, inject, defineProps, defineEmits} from "vue";
interface EditProp {
  text: string;
  language: string;
  theme: string;
  readonly: boolean;
  fontSize: number;
  height: number;
}
const editProp: EditProp = {
  text: "",
  language: "sql",
  theme: "vs-dark",
  readonly: false,
  fontSize: 14,
  height: 400,
};
const fatherProp = defineProps(['heights'])
fatherProp?fatherProp?.heights:editProp?.height;
const copyTest = defineEmits([editProp.text])

const handleCopy = () => {
    copyTest('fun',editProp?.text)
}

onMounted(() => {
    handleCopy
})
/**
 * VS Code 编辑器
 *
 * 通过 getEditorVal 函数向外传递编辑器即时内容
 * 通过 initValue 用于初始化编辑器内容。
 * 编辑器默认 sql 语言，支持的语言请参考 node_modules\monaco-editor\esm\vs\basic-languages 目录下~
 * 编辑器样式仅有   'vs', 'vs-dark', 'hc-black' 三种
 * editor.setValue(newValue)
 * editor.getValue()
 * editor.onDidChangeModelContent((val)=>{ // 监听值的变化  })
 * editor.getAction('editor.action.formatDocument').run()    // 格式化代码
 * editor.dispose()    // 销毁实例
 * editor.onDidChangeOptions　　// 配置改变事件
 * editor.onDidChangeLanguage　　// 语言改变事件
 * editor.setModelMarkers // 标记错误
 *  monaco.languages.registerCompletionItemProvider // 设置代码提示补全
 */
onBeforeUnmount(() => {
  // 摧毁方法
  editor.dispose();
});
self.MonacoEnvironment = {
  getWorker(_: string, label: string) {
    if (label === "json") {
      return new jsonWorker();
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker();
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker();
    }
    if (["typescript", "javascript"].includes(label)) {
      return new tsWorker();
    }
    return new EditorWorker();
  },
};
let editor: monaco.editor.IStandaloneCodeEditor;
const editorInit = () => {
  nextTick(() => {
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: true,
      noSyntaxValidation: false,
    });
    monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
      target: monaco.languages.typescript.ScriptTarget.ES2016,
      allowNonTsExtensions: true,
    });

    !editor
      ? (editor = monaco.editor.create(
          document.getElementById("codeEditBox") as HTMLElement,
          {
            value: editProp.text, // 编辑器初始显示文字
            language: editProp.language, // 语言支持自行查阅demo
            automaticLayout: true, // 自适应布局
            theme: editProp.theme, // 官方自带三种主题vs, hc-black, or vs-dark
            foldingStrategy: "indentation",
            renderLineHighlight: "all", // 行亮
            selectOnLineNumbers: true, // 显示行号
            minimap: {
              enabled: false,
            },
            readOnly: editProp.readonly, // 只读
            fontSize: editProp.fontSize, // 字体大小
            scrollBeyondLastLine: false, // 取消代码后面一大段空白
            overviewRulerBorder: false, // 不要滚动条的边
          }
        ))
      : editor.setValue("");
    // console.log(editor)
    // 监听值的变化
    editor.onDidChangeModelContent((val: any) => {
      editProp.text = editor.getValue();
    });
    AutoCompletion();
    // codeErrorMarkers();
  });
};
editorInit();
// @ts-ignore
const changeLanguage = () => {
  monaco.editor.setModelLanguage(editor.getModel(), editProp.language);
};

const codeErrorMarkers = () => {
  monaco.editor.setModelMarkers(editor.getModel(), "json", [
    {
      startLineNumber: 2,
      endLineNumber: 2,
      startColumn: 1,
      endColumn: 1,
      severity: monaco.MarkerSeverity.Error,
      message: `语法错误`,
    },
  ]);
  console.log("editor", editor);
};

const AutoCompletion = () => {
  monaco.languages.registerCompletionItemProvider(editProp.language, {
    provideCompletionItems: () => {
      let suggestions = [];
      // 设置sql关键字
      sqlLanguage.keywords.forEach((item) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Keyword,
          insertText: item,
        });
      });
      // 设置sql操作
      sqlLanguage.operators.forEach((item) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Operator,
          insertText: item,
        });
      });
      // 设置sql常用方法
      sqlLanguage.builtinFunctions.forEach((item) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: item,
        });
      });
      // 设置sql执行变量
      sqlLanguage.builtinVariables.forEach((item) => {
        suggestions.push({
          label: item,
          kind: monaco.languages.CompletionItemKind.Variable,
          insertText: item,
        });
      });
      return {
        suggestions: suggestions,
      };
    },
  });
};

const submitCode = () => {
  console.log("text.value", editProp.text);
  //   loading.value=true
  //   api.submitCode(text.value,route.query.identity).then(res=>{
  //     loading.value=false
  //       if(res.data.code==200){
  //         msg.value=res.data.data.msg

  //         if(res.data.data.status==1){
  //             ElMessage.success(res.data.data.msg)
  //         }else{
  //              ElMessage.warning(res.data.data.msg)
  //         }

  //       }else{
  //         ElMessage.error(res.data.msg)
  //       }
  //   })
};
</script>

<style lang="scss"  scoped>
#codeEditBox {
  height: 400px;
}
</style>