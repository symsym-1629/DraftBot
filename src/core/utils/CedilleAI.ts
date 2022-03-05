/* eslint-disable camelcase */

import {request} from "https";

export interface CedilleGenerationRequest {
	prompt: string,
	max_length: number,
	temperature: number,
	top_p: number,
	top_k: number,
	repetition_penalty: number,
	n: number
}

export class CedilleAI {
	static completionRequest(apiKey: string, generationRequest: CedilleGenerationRequest): Promise<string> {
		/*return new Promise(function(resolve, reject) {
			const postData = JSON.stringify(generationRequest);
			https.get({
				hostname: "https://api-prd.cedille.ai/completions",
				headers: {
					"Authorization": apiKey,
					"Content-Type": "application/json"
				},
				json: postData,
				rejectUnauthorized: false,
				method: "POST"
			}, (res) => {
				let data = "";

				res.on("data", (chunk) => {
					data += chunk;
				});

				res.on("end", () => {
					resolve(data);
				});
			}).on("error", (err) => {
				reject(err);
			});
		});*/

		const postData = JSON.stringify(generationRequest);
		return new Promise(function(resolve, reject) {
			const req = request({
				hostname: "api-prd.cedille.ai",
				headers: {
					"Authorization": "Bearer " + apiKey,
					"Content-Type": "application/json"
				},
				rejectUnauthorized: false,
				method: "POST",
				path: "/completions"
			}, function(res) {
				let data = "";
				res.setEncoding("utf8");
				res.on("end", () => {
					resolve(JSON.parse(data).choices[0].text);
				});
				res.on("data", (chunk) => {
					data += chunk;
				});
				res.on("error", (err) => {
					reject(err);
				});
			});
			req.write(postData);
			req.end();
		});
	}

	static async completeSentence(apiKey: string, prompt: string): Promise<string> {
		return await this.completionRequest(apiKey,
			{
				prompt,
				max_length: 128,
				temperature: 1,
				top_p: 0.8,
				top_k: 50,
				repetition_penalty: 1.1,
				n: 1
			});
	}
}