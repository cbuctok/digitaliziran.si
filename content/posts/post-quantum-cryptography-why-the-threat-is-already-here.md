---
title: "Post-Quantum Cryptography: Why the Threat is Already Here"
date: 2025-08-04T10:55:00
slug: post-quantum-cryptography-why-the-threat-is-already-here
categories: ["audit", "CISO", "General", "Security"]
tags: ["cryptography", "en", "security", "software development"]
---

## A Practical Guide for InfoSec Professionals and Auditors

As someone working daily with ISO standards and AI governance frameworks, I've been closely following NIST's post-quantum cryptography (PQC) standardization process. What I've discovered should concern every InfoSec professional: the threat to our current encryption isn't waiting for some hypothetical quantum computer. It's already growing in GPU farms around the world.

In this guide, I'll break down what you need to know about post-quantum cryptography without the complex mathematics. More importantly, I'll explain why this matters for your organization today, not in some distant quantum future.

## The Real Threat: Massive Parallel Computing is Already Here

When most people hear "post-quantum cryptography," they imagine scientists in lab coats working on exotic quantum computers. But here's what they miss: our current encryption was designed in an era of single processors. Today's reality is vastly different.

### The GPU Revolution Changed Everything

Since [Bitcoin demonstrated the power of GPU mining in 2010](https://en.bitcoin.it/wiki/Mining_hardware_comparison), we've seen an explosion in parallel computing capabilities. What started as gamers repurposing graphics cards has evolved into massive industrial operations:

- [NVIDIA's DGX SuperPOD can deliver 11.5 exaflops of AI computing](https://www.nvidia.com/en-us/data-center/dgx-superpod/)

- [Cloud providers like AWS offer clusters with thousands of GPUs](https://aws.amazon.com/ec2/instance-types/p4/)

- [The global GPU market is expected to reach $400 billion by 2027](https://www.grandviewresearch.com/industry-analysis/graphic-processing-unit-gpu-market)

This isn't theoretical. Right now, anyone with a credit card can rent massive GPU power from cloud providers. [AWS's p4d.24xlarge instances provide 8 NVIDIA A100 GPUs](https://aws.amazon.com/ec2/instance-types/p4/) for about $32 per hour. Scale that up, and you have nation-state-level computing power available to anyone.

### Why Current Encryption is Vulnerable

Our current encryption standards (RSA, ECC) rely on mathematical problems that seemed impossibly hard in the 1970s and 1990s. But they have a fatal flaw: they're vulnerable to parallel attacks.

Think of RSA encryption like a massive jigsaw puzzle. Having more people (GPUs) working on different sections simultaneously makes it finish faster. While a single computer might need [300 trillion years to break RSA-2048](https://www.keylength.com/en/4/), what happens when you have a million GPUs working in parallel?

The math is sobering:

- Every doubling of computing power cuts the time in half

- GPU performance [doubles approximately every 2.2 years](https://en.wikipedia.org/wiki/Moore%27s_law#Parallel_computation)

- Cloud GPU access gets cheaper every year

## NIST's Post-Quantum Standards: Built for a Different Era

In August 2024, [NIST released three post-quantum cryptography standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards) designed to resist both quantum and massive parallel attacks. Let me explain each one without the math:

### ML-KEM (Module-Lattice-Based Key-Encapsulation Mechanism)

**What it does:** This is what protects your connection when you visit a secure website.

**How it's different:** Instead of using multiplication (which parallelizes well), it uses lattice problems - imagine finding a specific point in a massive multi-dimensional maze. Adding more GPUs doesn't help much because each GPU still has to navigate the entire maze.

**Real-world impact:**

- [Cloudflare reported that 16% of their traffic already uses post-quantum key exchange](https://blog.cloudflare.com/nists-first-post-quantum-standards/)

- Performance is actually [faster than current elliptic curve cryptography](https://blog.cloudflare.com/the-tls-post-quantum-experiment/)

- Key sizes are larger (1,184 bytes vs 32 bytes) but still practical

### ML-DSA (Module-Lattice-Based Digital Signature Algorithm)

**What it does:** This proves that a document or software update really came from who it claims.

**How it's different:** Uses similar lattice-based problems as ML-KEM. The signature process involves adding carefully controlled "noise" that makes parallel attacks ineffective.

**Real-world impact:**

- Signatures are larger (2,420 bytes vs 64 bytes for ECDSA)

- [Signing is actually faster than RSA on modern hardware](https://pq-crystals.org/dilithium/data/dilithium-specification-round3.pdf)

- Already being tested in [certificate chains by major CAs](https://www.digicert.com/blog/digicert-announces-post-quantum-computing-toolkit)

### SLH-DSA (Stateless Hash-Based Digital Signature Algorithm)

**What it does:** The ultra-paranoid option for critical long-term signatures.

**How it's different:** Uses only hash functions - no fancy math at all. Even if all mathematical assumptions fail, hash functions would still need to be broken.

**Real-world impact:**

- Tiny keys (32 bytes) but large signatures (7,856 to 49,856 bytes)

- [Recommended for firmware updates and long-term archives](https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-208.pdf)

- Immune to mathematical breakthroughs

## The "Harvest Now, Decrypt Later" Threat is Real

Here's what keeps me up at night: adversaries don't need to decrypt your data today. They can steal encrypted data now and wait for either:

- **Better algorithms** - New mathematical discoveries that make attacks more efficient

- **Cheaper computing** - What costs $1 million in GPU time today might cost $1,000 in five years

- **Quantum computers** - If they ever arrive, they're just another tool in the arsenal

[The NSA has warned about this "harvest now, decrypt later" threat](https://media.defense.gov/2021/Aug/04/2002821837/-1/-1/1/Quantum_FAQs_20210804.PDF), and it's not hypothetical. [Researchers have already demonstrated storing encrypted data for future decryption](https://www.reuters.com/technology/china-researchers-achieve-quantum-computational-advantage-2021-10-26/).

## What This Means for Your Organization

### Immediate Risks to Consider

From my experience with ISO frameworks and security audits, here are the critical questions every organization should ask:

-

**Data Lifespan**: How long does your data need to remain confidential?

<li>Medical records: 100+ years

- Financial data: 7-10 years

- Trade secrets: 20+ years

- Personal data: Lifetime of the individual

</li>

-

**Attack Surface**: What's exposed to potential harvesting?

<li>Internet-facing systems

- Cloud storage

- Email communications

- Backup systems

</li>

-

**Computational Resources of Adversaries**:

<li>Nation-states with unlimited budgets

- Organized crime with cloud resources

- Competitors with specific targets

- Insider threats with system access

</li>

### A Practical Migration Framework

Based on [NIST's migration guidance](https://nvlpubs.nist.gov/nistpubs/ir/2024/NIST.IR.8547.ipd.pdf) and industry best practices, here's a framework I recommend:

#### Phase 1: Discovery and Inventory (Do This NOW)

- Catalog all cryptographic implementations

- Document key sizes and algorithms

- Map data flows and dependencies

- Identify high-value targets

*Tools: [NIST's Cryptographic Module Validation Program lists](https://csrc.nist.gov/projects/cryptographic-module-validation-program)*

#### Phase 2: Risk Assessment and Prioritization

- Classify data by sensitivity and lifespan

- Assess threat actors and their capabilities

- Calculate time-to-vulnerability

- Prioritize systems for migration

*Framework: Use [NIST's Cybersecurity Framework](https://www.nist.gov/cyberframework) with PQC considerations*

#### Phase 3: Testing and Validation

- Deploy PQC in test environments

- Measure performance impacts

- Test interoperability

- Validate security controls

*Resources: [Open Quantum Safe project](https://openquantumsafe.org/) provides testing tools*

#### Phase 4: Hybrid Implementation

- Deploy both classical and PQC algorithms

- Ensure backward compatibility

- Monitor for issues

- Train operations teams

*Standard: [IETF's hybrid key exchange draft](https://datatracker.ietf.org/doc/draft-ietf-tls-hybrid-design/)*

#### Phase 5: Full Migration

- Replace classical algorithms

- Decommission old systems

- Update security policies

- Continuous monitoring

## Common Misconceptions and Pitfalls

### "We'll Wait for Quantum Computers"

This is the most dangerous misconception. As I've shown, the threat from massive parallel computing is already here. Waiting for quantum computers is like installing a security system after the burglary.

### "Our Data Isn't That Valuable"

[The average cost of a data breach is now $4.45 million](https://www.ibm.com/security/data-breach). But the real cost comes years later when encrypted data is finally cracked. Imagine explaining to customers in 2035 that their 2024 data was just decrypted.

### "It's Too Early to Act"

Migration takes years, not months. [Google started experimenting with post-quantum crypto in 2016](https://security.googleblog.com/2016/07/experimenting-with-post-quantum.html). The [US government mandated agencies begin migration in 2022](https://www.whitehouse.gov/wp-content/uploads/2022/11/M-23-02-M-Memo-on-Migrating-to-Post-Quantum-Cryptography.pdf). Early adopters are already moving.

### "The Performance Impact is Too High"

Recent benchmarks show this isn't true:

- [ML-KEM is actually faster than ECDH on many platforms](https://eprint.iacr.org/2019/1086.pdf)

- Network overhead is minimal (a few KB per connection)

- Modern processors handle PQC efficiently

## Practical Steps for Auditors and InfoSec Professionals

### Update Your Audit Frameworks

Add these questions to your security assessments:

-

**Cryptographic Inventory**

<li>"Do you have a complete inventory of cryptographic implementations?"

- "When was it last updated?"

- "Does it include key sizes and algorithms?"

</li>

-

**Migration Planning**

<li>"Do you have a PQC migration roadmap?"

- "What's your timeline for implementation?"

- "How will you handle the transition period?"

</li>

-

**Risk Assessment**

<li>"Have you assessed vulnerability to parallel computing attacks?"

- "What's the lifespan of your most sensitive data?"

- "Have you considered the harvest-now-decrypt-later threat?"

</li>

-

**Vendor Management**

<li>"Do your critical vendors support PQC?"

- "What's their migration timeline?"

- "How will you handle non-compliant vendors?"

</li>

### Build Your PQC Competency

You don't need to understand the math, but you should understand:

- The difference between symmetric and asymmetric cryptography

- Why key sizes are increasing

- How hybrid modes work

- Performance and compatibility trade-offs

Resources for learning:

- [NIST's PQC FAQ](https://csrc.nist.gov/Projects/post-quantum-cryptography/faqs)

- [CISA's Post-Quantum Cryptography Initiative](https://www.cisa.gov/quantum)

- [ETSI's Quantum Safe Cryptography resources](https://www.etsi.org/technologies/quantum-safe-cryptography)

### Start the Conversation Now

From my experience with ISO 42001 implementations, the biggest challenge isn't technical - it's organizational. Start socializing these concepts:

- Brief leadership on the GPU threat (not just quantum)

- Quantify the risk in business terms

- Build a coalition of stakeholders

- Create a sense of urgency without panic

## The Bottom Line

Post-quantum cryptography isn't about preparing for some distant sci-fi future. It's about defending against the massive parallel computing resources that exist today and will only grow more powerful tomorrow.

The GPU revolution has fundamentally changed the threat landscape. Cloud providers offer nation-state-level computing power to anyone with a credit card. Our current encryption, designed for a different era, is showing its age.

NIST's new standards offer a path forward. They're designed to resist both classical parallel attacks and hypothetical quantum computers. The technology is ready, the standards are published, and early adopters are already migrating.

As InfoSec professionals and auditors, we have a responsibility to drive this change. Every day we delay is another day adversaries can harvest encrypted data for future decryption. The time to act isn't when quantum computers arrive or when GPU farms get 1000x more powerful.

The time to act is now.

## Additional Resources

- [NIST Post-Quantum Cryptography Project](https://csrc.nist.gov/projects/post-quantum-cryptography)

- [Migration to Post-Quantum Cryptography Guide](https://www.nccoe.nist.gov/crypto-agility-considerations-migrating-post-quantum-cryptographic-algorithms)

- [Open Quantum Safe Testing Tools](https://openquantumsafe.org/)

- [IETF Post-Quantum Use Cases](https://datatracker.ietf.org/doc/draft-ietf-pquip-pqc-engineers/)

- [NSA's Commercial National Security Algorithm Suite 2.0](https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF)
