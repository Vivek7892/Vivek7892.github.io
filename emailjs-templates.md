# EmailJS Templates

Use these with the existing values in `js/emailjs-config.js`.

## Contact Notification Template

Template ID: `template_c3jtcll`

To email:
```text
{{to_email}}
```

From name:
```text
{{from_name}}
```

Reply to:
```text
{{reply_to}}
```

Subject:
```text
New portfolio message from {{from_name}}
```

HTML body:
```html
<div style="font-family: Inter, Arial, sans-serif; color: #1a1a1a; background: #fafaf8; padding: 24px;">
  <div style="max-width: 560px; margin: 0 auto; border: 1px solid #d4d4d0; background: #ffffff; padding: 22px;">
    <p style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #5a5a5a; margin: 0 0 12px;">
      ## vivekv.me contact
    </p>
    <h2 style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 22px; margin: 0 0 16px;">
      New message from {{from_name}}
    </h2>
    <p><strong>Email:</strong> <a href="mailto:{{from_email}}">{{from_email}}</a></p>
    <p><strong>Sent:</strong> {{sent_at}}</p>
    <p><strong>Page:</strong> <a href="{{page_url}}">{{page_url}}</a></p>
    <hr style="border: 0; border-top: 1px solid #d4d4d0; margin: 18px 0;">
    <p style="white-space: pre-line; line-height: 1.7;">{{message}}</p>
  </div>
</div>
```

## Auto Reply Template

Template ID: `template_vgrkmx9`

To email:
```text
{{to_email}}
```

From name:
```text
{{owner_name}}
```

Reply to:
```text
{{owner_email}}
```

Subject:
```text
Thanks for reaching out, {{to_name}}
```

HTML body:
```html
<div style="font-family: Inter, Arial, sans-serif; color: #1a1a1a; background: #fafaf8; padding: 24px;">
  <div style="max-width: 560px; margin: 0 auto; border: 1px solid #d4d4d0; background: #ffffff; padding: 22px;">
    <p style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #5a5a5a; margin: 0 0 12px;">
      ## vivekv.me
    </p>
    <h2 style="font-family: 'Space Grotesk', Arial, sans-serif; font-size: 22px; margin: 0 0 16px;">
      Thanks for your message, {{to_name}}
    </h2>
    <p style="line-height: 1.7;">
      I received your message and will reply as soon as I can, usually within 24 hours.
    </p>
    <p style="line-height: 1.7;">
      Here is a copy of what you sent:
    </p>
    <div style="border-left: 3px solid #2563eb; background: #f2f2ef; padding: 12px 14px; margin: 16px 0;">
      <p style="white-space: pre-line; line-height: 1.7; margin: 0;">{{message}}</p>
    </div>
    <p style="font-size: 13px; color: #5a5a5a;">
      Sent from <a href="{{page_url}}">vivekv.me</a> on {{sent_at}}.
    </p>
    <p style="margin-top: 18px;">
      Regards,<br>
      {{owner_name}}<br>
      <a href="mailto:{{owner_email}}">{{owner_email}}</a>
    </p>
  </div>
</div>
```
