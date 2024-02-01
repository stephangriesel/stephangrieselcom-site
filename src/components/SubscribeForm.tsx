const SubscribeForm = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submit!");
  };

  return (<form onSubmit={handleSubmit}>
    <label htmlFor="email">Enter your email</label>
    <input type="email" name="email" id="email" />
    <button type="submit">Subscribe</button>
    </form>
  );
};

export default SubscribeForm