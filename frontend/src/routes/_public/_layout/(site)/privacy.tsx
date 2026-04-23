import { createFileRoute } from '@tanstack/react-router'
import Markdown from 'react-markdown'

import privacy from '#/pages/external/privacy.md?raw'

export const Route = createFileRoute('/_public/_layout/(site)/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="z-10 mt-20 px-8 py-16">
      <div className="container mx-auto max-w-4xl">
        <Markdown
          components={{
            h1: ({ children }) => (
              <h1 className="mb-10 text-4xl font-medium tracking-tighter md:text-5xl lg:text-6xl">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="mb-3 mt-6 text-lg font-medium tracking-tight">{children}</h3>
            ),
            p: ({ children }) => (
              <p className="mb-8 text-sm md:text-md text-muted-foreground/70 leading-relaxed">
                {children}
              </p>
            ),
            a: ({ href, children }) => (
              <a href={href} className="text-primary hover:underline">
                {children}
              </a>
            ),
            strong: ({ children }) => (
              <strong className="font-semibold text-(--brand-secondary)">{children}</strong>
            ),
            em: ({ children }) => (
              <em className="text-muted-foreground">{children}</em>
            ),
            hr: () => (
              <hr className="my-10 border-t border-(--color-border-subtle)" />
            ),
            ul: ({ children }) => (
              <ul className="mb-8 ml-6 list-disc text-sm md:text-md space-y-2 text-muted-foreground/70">{children}</ul>
            ),
            li: ({ children }) => (
              <li className="leading-relaxed text-muted-foreground">{children}</li>
            ),
          }}
        >
          {privacy}
        </Markdown>
      </div>
    </section>
  )
}
