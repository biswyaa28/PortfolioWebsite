export default function Loader() {
  return (
    <output
      className="global-loader"
      role="status"
      aria-label="Loading"
      aria-live="polite"
    >
      <div className="global-loader__terminal" aria-hidden="true">
        <div className="global-loader__titlebar">
          <span className="global-loader__dot global-loader__dot--red" />
          <span className="global-loader__dot global-loader__dot--amber" />
          <span className="global-loader__dot global-loader__dot--green" />
          <span className="global-loader__title">build.grimno</span>
        </div>

        <div className="global-loader__screen">
          <p className="global-loader__line">$ npm run build</p>
          <p className="global-loader__line global-loader__line--muted">
            › compiling modules…
          </p>
          <p className="global-loader__line global-loader__line--success">
            ✓ assets optimized
          </p>
          <p className="global-loader__line global-loader__line--active">
            ● generating bundles
            <span className="global-loader__cursor-block" />
          </p>

          <div className="global-loader__progress" aria-hidden="true">
            <div className="global-loader__progress-fill" />
          </div>
        </div>
      </div>
    </output>
  );
}
