import { useRouter } from "vue-router";
const router = useRouter();

const toPage = (url:string)=> {
    router.push(url);
}

export default toPage