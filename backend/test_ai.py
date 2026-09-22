from backend.app.ai.ollama_client import analyze_image


IMAGE_PATH = "samples/phishing_test.png"


def main():
    print("\n🏹 DEAD EYE — Local AI Observation\n")
    print(f"Analyzing: {IMAGE_PATH}\n")

    result = analyze_image(IMAGE_PATH)

    print("══════════════════════════════════════")
    print(f"Sender:             {result.sender}")
    print(f"Subject:            {result.subject}")
    print(f"CTA:                {result.call_to_action}")
    print(f"URLs:               {result.urls}")
    print("══════════════════════════════════════")

    print("\nSecurity Observations:")
    print(f"  Urgency:              {result.urgency}")
    print(f"  Credential Request:   {result.credential_request}")
    print(f"  Financial Targeting:  {result.financial_targeting}")
    print(f"  Impersonation:        {result.impersonation}")
    print(f"  Account Threat:       {result.account_threat}")


if __name__ == "__main__":
    main()