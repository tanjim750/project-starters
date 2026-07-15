import { Button } from "../../../shared/components/Button";
import { TextField } from "../../../shared/forms/TextField";

export function LoginPage() {
  return (
    <section className="page">
      <h1>Sign in</h1>
      <p>Authentication pages, forms, validators, store, and services live inside `apps/auth`.</p>
      <form>
        <TextField id="email" label="Email" name="email" type="email" />
        <TextField id="password" label="Password" name="password" type="password" />
        <Button type="submit">Continue</Button>
      </form>
    </section>
  );
}
