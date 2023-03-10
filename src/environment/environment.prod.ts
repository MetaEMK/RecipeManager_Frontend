export const environment = {
    production: true,
    api: {
        baseUrl: "http://" + window["env" as any]["apiUrl" as any] + ":3000/api/v1" || "http://baumstamm:3000/api/v1"
    }
};