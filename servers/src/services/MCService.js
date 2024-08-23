import MCQuestions from "../models/MCQuestions.js";

class MCQuestionsService{
    constructor(){}

    async createMCQuestion(mcQuestion){
        return await MCQuestions.create(mcQuestion);
    }
    async getMCQuestions(userId){
        return await MCQuestions.find();
    }
}

export default MCQuestionsService;