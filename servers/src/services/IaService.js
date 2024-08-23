import FreeQuestions from "../models/FreeQuestions.js";

class FreeQuestionsService {
  constructor() {}
  async getFreeQuestions() {
    return await FreeQuestions.find();
  }
  async getFreeQuestion(id) {
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
