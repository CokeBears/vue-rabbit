import httpInstance from "@/utils/http";

export const getCategoryAPI = (id) => {
    console.log(id);
    return httpInstance({
        url: '/category',
        params: {
            id
        }
    })
}