import Head from 'next/head'
import { useState, useEffect } from 'react';
import { LoremIpsum } from "lorem-ipsum";
import { getRandomInt } from '../utils/Random';


const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4
  },
  wordsPerSentence: {
    max: 16,
    min: 4
  }
});


export default function Entries() {
  const [entry, setEntry] = useState('');
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    async function fetchEntries() {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries/`);
      const json = await res.json();
      console.log(json)
      setEntries(json);
    }
    fetchEntries();
  }, [])

  function handleChange(e) {
    setEntry(e.target.value);
  }

  async function handleSubmit() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/entries/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user_id: getRandomInt(1000000000),
        title: lorem.generateWords(5), 
        description: lorem.generateSentences(2), 
        expiry: getRandomInt(1000000000), 
        created: getRandomInt(1000000000), 
        status: lorem.generateWords(1), 
        tags: lorem.generateWords(3), 
        outcome: lorem.generateSentences(1),
      })
    })
    const json = await res.json();
    setEntries([...entries, json])
  }

  return (
    <div>
      <Head>
        <title>Entries</title>
      </Head>
      <div className="container mx-auto p-10 m-10">
        <div className="flex flex-col">
          <h1 className="font-bold mb-3">Entries</h1>
          <textarea value={entry} onChange={handleChange} className="border-2" ></textarea>
          <div className="mx-auto p-3 m-5">
            <button onClick={handleSubmit} className="bg-green-500 p-3 text-white">Submit</button>
          </div>
          <div>
            <ul>
              {entries && entries.map((entry) =>
                  <li key={entry.id} className="bg-yellow-100 m-3 p-3 border-yellow-200 border-2">{entry.title}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
