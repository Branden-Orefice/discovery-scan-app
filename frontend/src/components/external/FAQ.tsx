import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const questions = [
  {
    id: 1,
    title: "How does Atlas Recon discover my assets?",
    description:
      "We combine passive reconnaissance (DNS records, certificate transparency logs, web archives, WHOIS data) with active scanning (port probing, web crawling, API enumeration) to build a comprehensive map of your attack surface, all without installing any agents.",
  },
  {
    id: 2,
    title: "Is scanning authorized? Will it affect my systems?",
    description:
      "You authorize scans for domains and IP ranges you own. Our active scanning is designed to be non-intrusive, we use rate limiting and passive techniques where possible. We never attempt to exploit vulnerabilities, only detect them.",
  },
  {
    id: 3,
    title: "How quickly do I see results?",
    description:
      "Initial results start appearing within minutes. A comprehensive scan of a typical enterprise domain completes within 1-4 hours depending on scope. Continuous monitoring then watches for changes 24/7.",
  },
  {
    id: 4,
    title: "Can I integrate Atlas Recon with my existing tools?",
    description:
      "Yes. We offer a full REST API, Slack notifications, webhook support, and SIEM integrations (Splunk, Elastic, Sentinel). Reports can be exported in JSON, CSV, or PDF format.",
  },
  {
    id: 5,
    title: "What does the free scan include?",
    description:
      "The free scan covers one domain with subdomain enumeration, port scanning, and basic vulnerability correlation, no credit card required. You'll get a full report of your external attack surface with risk scoring.",
  },
];

const FAQ = () => {
  const [openedId, setOpenedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col border-t border-(--color-border-subtle)">
      <section id="faq" className="container mx-auto">
        <div className="space-y-4 mt-20 relative flex flex-col items-center justify-center">
          <span className="text-primary uppercase text-[10px] tracking-wide flex items-center gap-2">
            FAQ
          </span>
          <h2 className="text-3xl font-bold">Common Questions</h2>
        </div>

        <div className="flex flex-col mt-10 md:w-150 w-80 md:px-0 px-3 justify-center mx-auto">
          {questions.map((question) => {
            const isOpen = openedId === question.id;

            return (
              <div
                key={question.id}
                className="border-b border-(--color-border-subtle) py-4"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpenedId(isOpen ? null : question.id)}
                >
                  <h3 className="md:text-[16px] text-xs font-semibold">{question.title}</h3>
                  {isOpen ? (
                    <ChevronUpIcon size={20} />
                  ) : (
                    <ChevronDownIcon size={20} />
                  )}
                </button>

                {isOpen && (
                  <p className="mt-3 md:text-sm text-xs text-(--color-text-muted) md:w-[80ch] w-[40ch]">
                    {question.description}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default FAQ;
