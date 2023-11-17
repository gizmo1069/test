require('dotenv').config();

const express = require('express');
const OpenAI = require('openai');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const openai = new OpenAI({
  apiKey: process.env["API_KEY"], // defaults to process.env["OPENAI_API_KEY"]
});

app.post('/feedback', async (req, res) => {
  try {
    const prompt = "Please provide feedback on a piece of writing. Answer in JSON form where feedback is the key, value is an object with two properties: 'strengths' and 'suggestions'. 'strengths' and 'suggestions' are both arrays of bullet points. Each bullet point has two properties: 'bulletPointKeyword' and 'bulletPointDetail.' Here is the writing: " + req.body.text;
    console.log(prompt);
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        {
          "role": "user",
          "content": prompt,
        }
      ]
    });
    const completion = response.choices[0].message.content;
    const firstIndex = completion.indexOf("{");
    const lastIndex = completion.lastIndexOf("}");
    const feedback = JSON.parse(completion.slice(firstIndex, lastIndex + 1));
    res.json(feedback);

  } catch (err) {
    console.log(err);
  }
});

app.post('/revise', async (req, res) => {
  try {
    const prompt = "Please revise the writing based on the provided suggestions. Answer in JSON form where 'revised' is the key, and the revised writting is the value. Here is the writing: " + req.body.text + ". Here are the suggestions: " + req.body.suggestions.join(" ");
    console.log(prompt);
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        {
          "role": "user",
          "content": prompt,
        }
      ]
    });
    const completion = response.choices[0].message.content.replace(/\s+/g, ' ');
    console.log("revised: ", completion);
    const revised = JSON.parse(completion.replace(" ", ""));
    res.json(revised);

  } catch (err) {
    console.log(err);
  }
});

app.post('/character', async (req, res) => {

  try {
    let prompt;
    if (!req.body.description) {
      prompt = "Generate an additional character that fits this story. Answer in JSON form where 'character' is key, and value is an object with three properties: 'description' as a string for the character description, 'integration' as a string for the integration into the story, and 'purpose' as a string for the purpose of this character. Here is the story: " + req.body.text;
    } else {
      prompt = "Generate an additional character that fits this story. The charcter " + req.body.description + ". Answer in JSON form where 'character' is key, and value is an object with three properties: 'description' as a string for the character description, 'integration' as a string for the integration into the story, and 'purpose' as a string for the purpose of this character. Here is the story: " + req.body.text;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        {
          "role": "user",
          "content": prompt,
        }
      ]
    });
    const completion = response.choices[0].message.content;
    console.log(completion);
    const firstIndex = completion.indexOf("{");
    const lastIndex = completion.lastIndexOf("}");
    const character = JSON.parse(completion.slice(firstIndex, lastIndex + 1));


    res.json(character);


  } catch (err) {
    console.log(err.message);
  }

});

app.post('/plot', async (req, res) => {

  try {
    let prompt;
    if (!req.body.description) {
      prompt = "Generate summary of the next chapter that continues this story. Answer should be in JSON format where 'plotSummary' is the only key and summary of next chapter should be the value. Here is the story: " + req.body.text;
    } else {
      prompt = "Generate summary of the next chapter that continues this story. THe story should " + req.body.description + ". Answer should be in JSON format where 'plotSummary' is the only key and summary of next chapter should be the value. Here is the story: " + req.body.text;
    }
    console.log(prompt);
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { "role": "system", "content": "You are a helpful assistant." },
        {
          "role": "user",
          "content": prompt,
        }
      ]
    });
    const completion = response.choices[0].message.content;
    const firstIndex = completion.indexOf("{");
    const lastIndex = completion.lastIndexOf("}");
    const plot = JSON.parse(completion.slice(firstIndex, lastIndex + 1));


    res.json(plot);


  } catch (err) {
    console.log(err.message);
  }

});

app.post('/image', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          "role": "user",
          "content": req.body.prompt,
        }
      ]
    });
    const completion = response.choices[0].message.content;
    console.log(completion);
    const response1 = await openai.images.generate({
      model: "dall-e-3",
      prompt: completion,
      n: 1,
      size: "1024x1024",
    });
    console.log(response1.data);
    let url = response1.data[0].url;
    res.json({url});
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log('Server is running on port 8000.');
});