import getConfig from 'next/config';

export default async function (req, res) {
  const response = await fetch(process.env.NEXT_PUBLIC_LLC_ENDPOINT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": 'Bearer ' + process.env.NEXT_PUBLIC_OPENAI_API_KEY
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      // Take the content variable from the request body question
      "messages": [{"role":"user","content":req.body.question}],
      "temperature": 0.7

    }),
  });

    const data = await response.json();   
    console.log(data)
    // Add the the message content to a new property called success
    data['success'] = data.choices[0].message.content
    res.status(200).json({ result: data })
}