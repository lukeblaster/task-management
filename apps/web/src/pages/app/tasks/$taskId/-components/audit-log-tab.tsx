import { AuditLogCard } from "./audit-log-card";
import type { AuditLog } from "@/types/Task";

export const AuditLogTab = ({
  auditLogs,
}: {
  auditLogs: AuditLog[] | undefined;
}) => {
  return (
    <div className="py-3 space-y-2">
      <h2 className="font-semibold text-lg">Logs</h2>
      <div className="flex flex-col px-0.5 py-3 gap-3 max-h-[calc(30%-30px)] overflow-auto">
        {auditLogs?.map((auditLog) => (
          <AuditLogCard key={auditLog._id} auditLog={auditLog.props} />
        ))}
      </div>
    </div>
  );
};
