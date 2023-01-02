import timelineModel from "../model/timeline.model.js"

class Timeline {
    async createNewActivity(data) {
        return await timelineModel.create(data)
    }
    async fetchTimeline(skp,lmt) {
        return await timelineModel.find({}).skip(skp).limit(lmt).sort({time: -1}).exec()
    }
    async getTotalCountOfDocuments() {
        return await timelineModel.countDocuments()
    }
    async UpdateActivity(id,bool) {
        return await timelineModel.updateOne({_id: id},{$set: {"isResolve.flag": bool}})
    }
}

export default new Timeline()