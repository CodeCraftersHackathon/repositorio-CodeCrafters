import { URL_IA } from "../config/config.js";

const url = URL_IA;

class ActivityIaCtrl {
  constructor() {}
    async generateActivityChoise(req, res) {
        const token = req.body.token;
        const { context, courseId } = req.body;
        const consulta = context + "JavaScript";
    
        try {
          const peticion = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: "cm-llama3.1",
              prompt: consulta,
              num_keep: 1,
            }),
          });
    
          // Establecer encabezados para indicar que se enviará una respuesta progresiva
          res.setHeader("Content-Type", "text/plain; charset=utf-8");
          res.setHeader("Transfer-Encoding", "chunked");
    
          let accumulatedJSON = "";
          let activity = "";
          const reader = peticion.body.getReader();
          let decoder = new TextDecoder();
          let chunk = await reader.read();
    
          while (!chunk.done) {
            const texto = decoder.decode(chunk.value, { stream: true });
            accumulatedJSON += texto;
    
            let startIndex = 0;
            while (startIndex < accumulatedJSON.length) {
              const startBracketIndex = accumulatedJSON.indexOf("{", startIndex);
              if (startBracketIndex === -1) break;
              const endBracketIndex = accumulatedJSON.indexOf(
                "}",
                startBracketIndex,
              );
              if (endBracketIndex === -1) break;
    
              const jsonString = accumulatedJSON.slice(
                startBracketIndex,
                endBracketIndex + 1,
              );
              try {
                const responseObject = JSON.parse(jsonString);
                const responseValue = responseObject.response;
                activity += responseValue;
                res.write(responseValue);
              } catch (error) {
                // Ignorar errores de análisis JSON parcial
              }
              startIndex = endBracketIndex + 1;
            }
    
            accumulatedJSON = accumulatedJSON.slice(startIndex);
            chunk = await reader.read();
          }
    
          res.end();
        } catch (error) {
          console.error(error);
          if (!res.headersSent) {
            res
              .status(500)
              .json({ message: "error leyendo el json en el servidor!" });
          }
        }
      }
    }


export default ActivityIaCtrl;