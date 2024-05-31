import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  confirmationLink: string;
}

export const VerifyEmail = ({ confirmationLink }: Props) => (
  <Html>
    <Head />
    <Preview>Your verification link for Cyber Locket</Preview>
    <Body style={main}>
      <Container style={container}>
        <Img
          // src={}
          width="42"
          height="42"
          alt="logo"
          style={logo}
        />
        <Heading style={heading}>
          Your verification link for Cyber Locket
        </Heading>
        <Section style={buttonContainer}>
          <Link style={button} href={confirmationLink}>
            Verify Account
          </Link>
        </Section>
        <Text style={paragraph}>
          This <Link href={confirmationLink}>link</Link> will only be valid for
          the next 60 minutes.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default VerifyEmail;

const logo = {
  borderRadius: 21,
  width: 42,
  height: 42,
};

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "24px",
  letterSpacing: "-0.5px",
  lineHeight: "1.3",
  fontWeight: "400",
  color: "#484848",
  padding: "17px 0 0",
};

const paragraph = {
  margin: "0 0 15px",
  fontSize: "15px",
  lineHeight: "1.4",
  color: "#3c4149",
};

const buttonContainer = {
  padding: "27px 0 27px",
};

const button = {
  backgroundColor: "#5e6ad2",
  borderRadius: "3px",
  fontWeight: "600",
  color: "#fff",
  fontSize: "15px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "11px 23px",
};
