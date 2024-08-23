//import { URL_IA } from "../config/config.js";
import FreeQuestionsService from "../services/IaService.js";
const url = "https://54e1-138-121-113-27.ngrok-free.app/api/generate";
const freeQuestionsService = new FreeQuestionsService();
import { decodedToken } from "../helpers/jwt.js";

class ActivityIaCtrl {
  constructor() { }
  async generateActivity(req, res) {
    const { consulta } = req.body;

    try {
      const peticion = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "cm-llama3.1",
          prompt: consulta,
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
      if (req.headers["authorization"]) {
        try {
          const token = req.headers["authorization"].split(" ")[1];
          const decoded = decodedToken(token);
          const userId = decoded.id;
          
          const newQuestionFree = await freeQuestionsService.createFreeQuestion({
            question: consulta,
            userId,
          });
        } catch (error) {
          console.log(error);
        }
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
  async correctionQuestion(req, res) {

    const body = req.body;

    const consulta = body.consulta.replace(/\n\s*/g, ' ');

    try {
      const peticion = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "cm-llama3.1-correction",
          prompt: consulta,
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
      if(req.headers["authorization"]){
        try {
          const token = req.headers["authorization"].split(" ")[1];
          const decoded = decodedToken(token);
          const userId = decoded.id;
          
          const getQuestion = await freeQuestionsService.getLastFreeQuestion(userId);
          //agrega la calificación a la pregunta
          //filtrar del texto la calificación
          const calificacion = activity.match(/-?\d+\.?\d*/);
          getQuestion.calification = calificacion[0];
          await getQuestion.save();
        } catch (error) {
          console.log(error);
          
        }

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
  async resumeGenerate(req, res) {
    
    const body = req.body
    console.log(body.context.consulta[0]);
    const consulta = body.context.consulta[0];
    try {
      const peticion = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "cm-llama3.1-resumen",
          prompt: consulta,
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
  async saveActivityMC(req, res) {
    const { consulta } = req.body;
    const token = req.headers["authorization"].split(" ")[1];
    const decoded = decodedToken(token);
    const userId = decoded.id;
    try {
      const newMCQuestion = await MCQuestions.create({
        activityTeorical: consulta,
        userId,
      });
      console.log(newMCQuestion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error al guardar la actividad" });
    }
  }
}

export default ActivityIaCtrl;
