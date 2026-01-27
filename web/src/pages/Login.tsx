import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Title700 } from "@/components/ui/title";
import { type ReactElement } from "react";
import { useFetcher } from "react-router";

/* 
  FORM ACTION HANDLES THE SUCCESSFUL AUTHENTICATION
  THIS COMPONENT ONLY NEEDS TO HANDLE FAILED AUTHENTICATION AND INITIAL STATE.
*/
export default function Login(): ReactElement {
  const fetcher = useFetcher();
  const { Form, state } = fetcher;
  const data = fetcher.data as { error: string } | undefined;
  const isInvalid = data && data.error !== undefined;

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <Title700 as="h1">Log In</Title700>
        <p>Use your email address and password to continue.</p>
      </div>

      <Form method="POST" className="max-w-md space-y-4">
        {isInvalid && (
          <FieldError className="font-semibold">{data.error}</FieldError>
        )}

        <Field>
          <FieldLabel htmlFor="email">
            Email <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="example@email.com"
            required
            aria-invalid={isInvalid}
          />
          <FieldError />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">
            Password <span className="text-destructive">*</span>
          </FieldLabel>
          <Input
            type="password"
            id="password"
            name="password"
            required
            aria-invalid={isInvalid}
          />
        </Field>

        <Button
          type="submit"
          className="capitalize"
          disabled={state !== "idle"}
        >
          {state === "idle" ? "Log in" : state + "..."}
        </Button>
      </Form>
    </section>
  );
}
