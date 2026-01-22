import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Title700 } from "@/components/ui/title";
import { type ReactElement } from "react";
import { useFetcher } from "react-router";

export default function Login(): ReactElement {
  const fetcher = useFetcher();
  const { Form, state } = fetcher;
  const data = fetcher.data as Record<string, unknown> | undefined;
  const hasAuthenticationFailed = data && data.error !== undefined;

  return (
    <section className="space-y-8">
      <div className="space-y-2">
        <Title700 as="h1">Log In</Title700>
        <p>Use your email address and password to continue.</p>
      </div>

      <Form method="POST" className="max-w-md space-y-4">
        {hasAuthenticationFailed && (
          <FieldError className="font-semibold">
            {data.error as string}
          </FieldError>
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
            aria-invalid={hasAuthenticationFailed}
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
            aria-invalid={hasAuthenticationFailed}
          />
        </Field>

        <Button type="submit" className="capitalize">
          {state === "idle" ? "Log in" : state + "..."}
        </Button>
      </Form>
    </section>
  );
}
