
import ManualGmailScan from "./ManualGmailScan";

export default function GmailConnectCard({ connected }) {
  if (connected) {
    return (
      <ManualGmailScan/>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <h3 className="font-semibold mb-2">Gmail Integration</h3>
      <button
        className="bg-glow text-bg px-4 py-2 rounded"
        onClick={() =>
          (window.location.href =
            import.meta.env.VITE_API_URL + "/gmail/connect")
        }
      >
        Connect Gmail
      </button>
    </div>
  );
}
