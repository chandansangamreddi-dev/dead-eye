from backend.app.ai.ollama_client import analyze_image


IMAGE_PATH = "samples/phishing_test.png"

def main():
    print("\n🏹 DEAD EYE — Local Threat Analysis\n")
    print(f"Analyzing: {IMAGE_PATH}\n")

    result = analyze_image(IMAGE_PATH)

    print("══════════════════════════════════════")
    print(f"Risk Level:        {result.risk_level}")
    print(f"Threat Type:       {result.threat_type}")
    print(f"Confidence:        {result.confidence:.0%}")
    print(f"Guardian Action:   {result.guardian_action}")
    print("══════════════════════════════════════")

    print("\nEvidence:")

    for item in result.evidence:
        print(f"  • {item}")

    print("\nExplanation:")
    print(f"  {result.explanation}")

    print("\nRecommended Action:")
    print(f"  {result.recommended_action}")


if __name__ == "__main__":
    main()