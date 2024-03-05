import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Let's post
        <br className='max-md:hidden' />
        <span className="orange_gradient text-center"> How you feel right now in CoE?</span>
      </h1>
      <p className="desc text-center">
        By 6510110356 and 6510110041
      </p>

      {/* Feed */}
      <Feed />
    </section>
  );
};

export default Home;
