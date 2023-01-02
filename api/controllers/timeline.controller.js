import timelineService from "../services/timeline.service.js";
import url from "url"
const { fetchTimeline,getTotalCountOfDocuments } = timelineService;
class TimelineController {
    async fetchAllActivites(req, res) {
        try {
            const parsedUrl = url.parse(req.url, true);
            const queryParams = parsedUrl.query;
            const {skip,limit} = queryParams;
            const count = await getTotalCountOfDocuments();
            const totalPages = Math.ceil(count / limit);
            const activites = await fetchTimeline(skip,limit)
            return res.json({ reqStatus: true, data: {count,activites,totalPages} })
        }
        catch (e) {
            return res.status(500).json({ reqStatus: false, data: "Internal error." });
        }
    }
}

export default new TimelineController()