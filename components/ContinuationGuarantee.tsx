export default function ContinuationGuarantee() {
  return (
    <div className="mt-8 md:mt-12 p-6 md:p-8 bg-line2/30 border border-line rounded-lg">
      <div className="flex gap-4">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-cloudText"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-[16px] md:text-[17px] font-semibold text-bone">
            Continuation Guarantee
          </h3>
          <p className="mt-2 text-[15px] leading-[1.6] text-mute">
            Follow the program and if you don&apos;t see results in 90 days, Kris keeps coaching you free until you do. This is not a refund guarantee &mdash; it&apos;s a commitment that Kris stays invested in your transformation.
          </p>
        </div>
      </div>
    </div>
  );
}
