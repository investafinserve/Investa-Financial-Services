"use client";

import { useCallback, useState, useSyncExternalStore } from "react";

type Props = {
  url: string;
  title: string;
};

function IconX({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function IconFacebook({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function IconLinkedIn({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function IconWhatsApp({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function IconShareNative({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
      />
    </svg>
  );
}

function IconLink({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
      />
    </svg>
  );
}

function IconCheck({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

const iconBtnBase =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-300/80 bg-slate-200/90 text-slate-600 transition-colors duration-200 ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-400/50 focus-visible:ring-offset-2";

const noOpSubscribe = () => () => {};

function readNativeShareSupport(): boolean {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export default function ArticleShare({ url, title }: Props) {
  const [copied, setCopied] = useState(false);
  const canNativeShare = useSyncExternalStore(noOpSubscribe, readNativeShareSupport, () => false);

  const onCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard may be denied */
    }
  }, [url]);

  const onNativeShare = useCallback(async () => {
    try {
      await navigator.share({ title, text: title, url });
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
    }
  }, [title, url]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const waText = encodeURIComponent(`${title}\n${url}`);
  const mailHref = `mailto:?subject=${encodedTitle}&body=${encodeURIComponent(`${title}\n\n${url}`)}`;

  return (
    <section
      className="rounded-3xl border border-slate-100 bg-gradient-to-br from-slate-50/80 to-white p-6 sm:p-8 shadow-sm"
      aria-labelledby="share-article-heading"
    >
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="text-center sm:text-left sm:min-w-0 sm:flex-1">
          <h2 id="share-article-heading" className="text-lg font-extrabold text-slate-900 mb-1">
            Share this article
          </h2>
          <p className="text-sm text-slate-600">Spread the word on social or copy the link.</p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:justify-end sm:shrink-0">
          {canNativeShare ? (
            <button
              type="button"
              onClick={onNativeShare}
              className={`${iconBtnBase} cursor-pointer hover:border-teal-600 hover:bg-teal-600 hover:text-white active:border-teal-600 active:bg-teal-600 active:text-white`}
              aria-label="Share using your device"
            >
              <IconShareNative className="h-5 w-5" />
            </button>
          ) : null}
          <a
            href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconBtnBase} hover:border-black hover:bg-black hover:text-white active:border-black active:bg-black active:text-white`}
            aria-label={`Share on X: ${title}`}
          >
            <IconX className="h-[1.125rem] w-[1.125rem]" />
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconBtnBase} hover:border-[#1877F2] hover:bg-[#1877F2] hover:text-white active:border-[#1877F2] active:bg-[#1877F2] active:text-white`}
            aria-label={`Share on Facebook: ${title}`}
          >
            <IconFacebook className="h-[1.15rem] w-[1.15rem]" />
          </a>
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconBtnBase} hover:border-[#0A66C2] hover:bg-[#0A66C2] hover:text-white active:border-[#0A66C2] active:bg-[#0A66C2] active:text-white`}
            aria-label={`Share on LinkedIn: ${title}`}
          >
            <IconLinkedIn className="h-5 w-5" />
          </a>
          <a
            href={`https://api.whatsapp.com/send?text=${waText}`}
            target="_blank"
            rel="noopener noreferrer"
            className={`${iconBtnBase} hover:border-[#25D366] hover:bg-[#25D366] hover:text-white active:border-[#25D366] active:bg-[#25D366] active:text-white`}
            aria-label={`Share on WhatsApp: ${title}`}
          >
            <IconWhatsApp className="h-5 w-5" />
          </a>
          <a
            href={mailHref}
            className={`${iconBtnBase} hover:border-sky-600 hover:bg-sky-600 hover:text-white active:border-sky-600 active:bg-sky-600 active:text-white`}
            aria-label={`Share by email: ${title}`}
          >
            <IconMail className="h-5 w-5" />
          </a>
          <button
            type="button"
            onClick={onCopy}
            className={`${iconBtnBase} cursor-pointer ${
              copied
                ? "border-violet-600 bg-violet-600 text-white"
                : "hover:border-violet-600 hover:bg-violet-600 hover:text-white active:border-violet-600 active:bg-violet-600 active:text-white"
            }`}
            aria-label={copied ? "Link copied" : "Copy article link"}
            aria-live="polite"
          >
            {copied ? <IconCheck className="h-5 w-5" /> : <IconLink className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </section>
  );
}
