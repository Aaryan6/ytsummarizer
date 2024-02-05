import { YoutubeLoader } from "langchain/document_loaders/web/youtube";

async function main() {
  const loader = YoutubeLoader.createFromUrl(
    "https://youtu.be/DJvM2lSPn6w?si=-h3V291DyPEsp5fT",
    {
      language: "en",
      addVideoInfo: true,
    }
  );

  const docs = await loader.load();

  console.log(docs);
}
main();
