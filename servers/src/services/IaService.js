import FreeQuestions from "../models/FreeQuestions.js";

class FreeQuestionsService {
  constructor() {}
  async getFreeQuestions() {
    return await FreeQuestions.find();
  }
  async getLastFreeQuestion(userId) {
    try {
      //obtener la ultima actividad realizada el usuario
      const activuty = await FreeQuestions.findById(userId).sort({ _id: -1 });
      return activuty;
    } catch (error) {
      console.log(error); 
    }
  }
  async getFreeQuestionById(id) {
    return await FreeQuestions.findById(id);
  }
  async createFreeQuestion(freeQuestion) {
    return await FreeQuestions.create(freeQuestion);
  }
  async updateFreeQuestion(id, freeQuestion) {
    return await FreeQuestions.findByIdAndUpdate(id, freeQuestion, {
      new: true,
    });
  }
  async deleteFreeQuestion(id) {
    return await FreeQuestions.findByIdAndDelete(id);
  }
}

export default FreeQuestionsService;
