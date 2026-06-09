import re

def analyze_uae_risks(text):
    risks = []
    text_lower = text.lower()

    # 1. Non-Compete Clause Check (Article 10)
    # UAE Law: Max 2 years.
    if "non-compete" in text_lower or "non compete" in text_lower:
        match = re.search(r'(\d+)\s*[-]*\s*year(?:s)?\s*non[- ]compete', text_lower)
        if match and int(match.group(1)) > 2:
            risks.append({
                "risk": "Invalid Non-Compete Duration",
                "severity": "High",
                "explanation": "UAE Decree-Law No. 33 of 2021 caps non-compete clauses at 2 years. This contract specifies a longer duration.",
                "highlight": match.group(0)
            })

    # 2. Probation Period Check (Article 9)
    # UAE Law: Max 6 months.
    if "probation" in text_lower:
        match = re.search(r'(\d+)\s*[-]*\s*month(?:s)?\s*probation', text_lower)
        if match and int(match.group(1)) > 6:
            risks.append({
                "risk": "Excessive Probation Period",
                "severity": "High",
                "explanation": "Probation periods in the UAE cannot legally exceed 6 months.",
                "highlight": match.group(0)
            })

    # 3. Notice Period Check
    if "termination" in text_lower or "notice" in text_lower:
        if "0 days" in text_lower or "immediate termination without notice" in text_lower:
             risks.append({
                "risk": "Unlawful Notice Period",
                "severity": "Medium",
                "explanation": "Employer must provide at least 14 days notice during probation, and 30-90 days post-probation.",
                "highlight": "immediate termination"
            })

    return risks