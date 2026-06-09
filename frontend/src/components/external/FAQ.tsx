import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";

const questions = [
  {
    id: 1,
    title: "What does Atlas Recon scan for?",
    description:
      "Atlas Recon scans WordPress sites for vulnerable core versions, plugins, themes, exposed WordPress endpoints, configuration issues, and known CVEs related to detected components.",
  },
  {
    id: 2,
    title: "Does Atlas Recon use WPScan?",
    description:
      "Yes. Atlas Recon uses WPScan under the hood for WordPress-specific scanning, then enriches the results with additional vulnerability intelligence from Wordfence.",
  },
  {
    id: 3,
    title: "What does Wordfence enrichment add?",
    description:
      "Wordfence enrichment helps connect detected WordPress components to known vulnerabilities, affected versions, patched versions, CVE references, CVSS data, and remediation guidance.",
  },
  {
    id: 4,
    title: "Will Atlas Recon exploit my site?",
    description:
      "No. Atlas Recon is designed to identify and report WordPress security issues, not exploit them. The goal is visibility, prioritization, and remediation.",
  },
  {
    id: 5,
    title: "Who is Atlas Recon built for?",
    description:
      "Atlas Recon is built for developers, agencies, security teams, and site owners who need a fast way to understand WordPress risk across plugins, themes, and core installations.",
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
                  <h3 className="md:text-[16px] text-xs font-semibold">
                    {question.title}
                  </h3>
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
