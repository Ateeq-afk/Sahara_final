import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  message: string;
  submittedAt: string;
}

export const ContactFormEmail = ({
  name,
  email,
  phone,
  message,
  submittedAt,
}: ContactFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>New contact form submission from {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            <Img
              src="https://sahara-developers.com/logo.png"
              width="150"
              height="50"
              alt="Sahara Developers"
            />
          </Section>

          <Heading style={h1}>New Contact Form Submission</Heading>
          
          <Section style={messageSection}>
            <Text style={sectionTitle}>Contact Details</Text>
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Name:</Text>
                <Text style={detailValue}>{name}</Text>
              </Column>
            </Row>
            <Row>
              <Column style={detailColumn}>
                <Text style={detailLabel}>Email:</Text>
                <Link href={`mailto:${email}`} style={link}>
                  {email}
                </Link>
              </Column>
            </Row>
            {phone && (
              <Row>
                <Column style={detailColumn}>
                  <Text style={detailLabel}>Phone:</Text>
                  <Link href={`tel:${phone}`} style={link}>
                    {phone}
                  </Link>
                </Column>
              </Row>
            )}
          </Section>

          <Section style={messageSection}>
            <Text style={sectionTitle}>Message</Text>
            <Text style={message}>{message}</Text>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              Submitted on: {new Date(submittedAt).toLocaleString()}
            </Text>
            <Text style={footerText}>
              Reply directly to this email to respond to {name}
            </Text>
          </Section>

          <Section style={divider} />

          <Text style={footer}>
            Sahara Developers - Building Dreams, Creating Spaces
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

ContactFormEmail.PreviewProps = {
  name: "Ateeq Rahman",
  email: "ateeq@example.com",
  phone: "+91 98765 43210",
  message: "I'm interested in your interior design services for my 3BHK apartment in Bangalore. Please share more details about your consultation process and pricing.",
  submittedAt: new Date().toISOString(),
} as ContactFormEmailProps;

export default ContactFormEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
};

const logoContainer = {
  padding: "32px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#333",
  fontSize: "24px",
  fontWeight: "600",
  lineHeight: "40px",
  margin: "0 0 20px",
  textAlign: "center" as const,
};

const messageSection = {
  padding: "24px 32px",
  borderRadius: "8px",
  backgroundColor: "#f9fafb",
  margin: "16px 32px",
};

const sectionTitle = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "16px",
};

const detailColumn = {
  width: "100%",
  marginBottom: "12px",
};

const detailLabel = {
  fontSize: "14px",
  fontWeight: "500",
  color: "#666",
  margin: "0 0 4px",
};

const detailValue = {
  fontSize: "16px",
  color: "#333",
  margin: "0",
};

const link = {
  color: "#2563eb",
  textDecoration: "none",
};

const message = {
  fontSize: "16px",
  lineHeight: "24px",
  color: "#333",
  whiteSpace: "pre-wrap" as const,
};

const footerSection = {
  padding: "24px 32px",
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "14px",
  color: "#666",
  margin: "8px 0",
};

const divider = {
  borderTop: "1px solid #e5e7eb",
  margin: "32px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
  margin: "0",
};