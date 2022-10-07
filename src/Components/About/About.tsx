export const About = () => {
  return (
    <div id="about-div">
      <h3>ABOUT</h3>
      <p>AI Memory is a game of memory like none other.</p>
      <strong>What makes this game different?</strong>
      <p>
        Well in this game of memory, you define the cards you're about to play
        with. At each game's start you will be presented with 8 different
        prompts.
      </p>
      <p>
        Once you complete the prompts and press the 'Lets Rock' button, the
        prompts are sent to a server I wrote that use the craiyon AI to generate
        the art for the cards you will play with.
      </p>
      <strong>It seems to be taking a long time...</strong>
      <p>Yeah, so it will be about 5 to 8 minutes to generate your card art. Unforunately, the packge I'm using to generate
        the art gets 9 images per prompt and I'm only taking the top one. It's a technical bug I haven't been able to figure out yet,
        but once I wrap my noodle around it, I'll be sure to update it. TL;DR You can't rush art, not even when a computer is behind the wheel.
      </p>
      <strong>Okay, so it's memory, now what?</strong>
      <p>Well after you clear the game, you have to match up the images with the phrases. To see how well you can interpret what the AI spat out at us given the prompts you provided.
        In this way you make your own difficulty. If you put obvious things like 'Super Mario', 'Candy', and 'Cats on Lollipops' it will be pretty easy. But if you enter something more
        abstract or similar to another prompt you entered you can level up the difficulty automatically for yourself!
      </p>
    </div>
  );
};

export default About;
