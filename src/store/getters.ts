const getters = {
    copyText: state => state.copy.copyText,
    url: state => state.file.url,
    params: state => state.file.params,
    fileName: state => state.file.fileName,
    isLoding: state => state.file.isLoding,
    dictMap : state => state.dict.dictMap,
}

export default getters;