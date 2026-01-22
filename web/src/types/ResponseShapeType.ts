export type ResponseShapeType = {
  statusCode: number;
  status: "success" | "failure" | "error";
  message: string;
  data?: Record<string, unknown>;
};
