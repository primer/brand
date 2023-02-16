---
'@primer/react-brand': minor
---

CTAForm Component

Example Usage

```jsx live
<CTAForm>
  <CTAForm.Input>
    <FormControl required>
      <FormControl.Label>Your work email address</FormControl.Label>
      <TextInput placeholder="name" />
    </FormControl>
  </CTAForm.Input>
  <CTAForm.Confirm>
    <FormControl required>
      <FormControl.Label>
        <Text size="300" variant="muted">
          I agree to the <InlineLink href="https://github.com">Privacy Policy</InlineLink> and{' '}
          <InlineLink href="https://github.com">Terms of Service</InlineLink>
        </Text>
      </FormControl.Label>
      <Checkbox name="confirm" />
    </FormControl>
  </CTAForm.Confirm>
  <CTAForm.Action>Subscribe</CTAForm.Action>
</CTAForm>
```

- [CTAForm Documentation](https://primer.style/brand/components/CTAForm)
