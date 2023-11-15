import express from 'express';
import OpenAI from 'openai';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const openai = new OpenAI({
  apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
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
    let prompt =  "A vibrant Pokemon scene with a young Pokemon trainer and various Pokemon around the trainer.";
    if (req.body.appearance) {
      prompt += "Keywords for the trainer's apperance are: " + req.body.appearance + ".";
    }
    if (req.body.scene) {
      prompt += "Keywords for the scene are: " + req.body.scene + ".";
    }
    // prompt += "It should include the following Pokemon and only the following Pokemon: "
    //  + req.body.pokemons.join(', ') + ".";

    console.log("prompt: ", prompt);
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: "Generate an avatar of a person with a confident, professional demeanor. They should have short, neatly styled hair, and wear a well-fitted suit and tie. The background should be a solid, muted color suitable for a corporate environment.",
      n: 1,
      size: "1024x1024",
    });
    console.log(response.data);
    image_url = response.data.data[0].url;
    res.json({url});
  } catch (err) {
    console.log(err);
  }
});

app.listen(8000, () => {
  console.log('Server is running on port 8000.');
});