import Jimp from "jimp"
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)


async function getImageURL(payloadFromClient) {
    let imagePath;
    try {
        if (payloadFromClient.Attachment !== undefined && payloadFromClient.Attachment.img !== "") {
            const matches = payloadFromClient.Attachment.img.match(/^data:image\/(png|jpg|jpeg|gif);base64,/);
            let extension = "";
            if (matches) {
                extension = matches[1];
            }
            if (extension === "gif") {
                return { img: "" };
            }
            const buffer = await Buffer.from(payloadFromClient.Attachment.img.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''), "base64")
            imagePath = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${extension}`
            const jimpResp = await Jimp.read(buffer)
            let h = jimpResp.bitmap.height
            let w = jimpResp.bitmap.width
            if (!payloadFromClient.Attachment.type) {
                await jimpResp
                    .write(path.resolve(__dirname, `../storage/${imagePath}`))
            }
            else {
                await jimpResp
                    .resize(150, Jimp.AUTO)
                    .write(path.resolve(__dirname, `../storage/${imagePath}`))
            }
            const result = {
                img: `${process.env.BASE_URL}/storage/${imagePath}`,
                width: w,
                height: h
            }
            return result;
        }
    }
    catch (e) {
        return { img: "" }
    }

}

export default getImageURL

