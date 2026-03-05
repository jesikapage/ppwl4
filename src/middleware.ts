import { Elysia, t } from "elysia";
import { openapi } from "@elysiajs/openapi";


const app = new Elysia()
.use(openapi()) 
app.get(
"/admin",
() => {
 return {
   stats: 99
 }
},
{
  headers: t.Object({
   authorization: t.String()
  }),
  beforeHandle({ headers, set }) {
    if (headers.authorization !== "Bearer 123") {
      set.status = 401
      return {
        success: false,
        message: "Unauthorized"
      }
    }
  }
}
)

app.onAfterHandle(({ response }) => {
  return {
    success: true,
    message: "data tersedia",
    data: response
  };
});

app.get("/product", () => ({
  id: 1,
  name: "Sisik Naga"
})) 

 .listen(3000);


console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);