// Generated by Xata Codegen 0.21.0. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "User",
    columns: [
      { name: "username", type: "string", notNull: true, defaultValue: "" },
      { name: "student", type: "link", link: { table: "Student" } },
      { name: "password", type: "string", notNull: true, defaultValue: "" },
      { name: "joined_date", type: "datetime" },
      { name: "role", type: "link", link: { table: "rolePermission" } },
    ],
  },
  {
    name: "Student",
    columns: [
      { name: "name", type: "string" },
      { name: "major", type: "string" },
      { name: "enrolled_year", type: "int" },
    ],
  },
  {
    name: "loginStats",
    columns: [
      { name: "user", type: "link", link: { table: "User" } },
      { name: "login_date", type: "datetime" },
      { name: "login_ip", type: "string", notNull: true, defaultValue: "" },
      { name: "success", type: "bool", notNull: true, defaultValue: "true" },
      { name: "remarks", type: "string" },
    ],
  },
  {
    name: "examResult",
    columns: [
      { name: "module_id", type: "link", link: { table: "Modules" } },
      { name: "student_id", type: "link", link: { table: "Student" } },
      { name: "semester", type: "int" },
      { name: "year", type: "int" },
      { name: "score", type: "float", notNull: true, defaultValue: "0" },
    ],
  },
  {
    name: "Modules",
    columns: [
      { name: "title", type: "string" },
      { name: "description", type: "text" },
    ],
  },
  {
    name: "events",
    columns: [
      { name: "occur_due", type: "datetime" },
      { name: "title", type: "string", notNull: true, defaultValue: "" },
      { name: "module", type: "link", link: { table: "Modules" } },
    ],
  },
  {
    name: "rolePermission",
    columns: [
      { name: "check_user_stats", type: "bool" },
      { name: "check_exam_stats", type: "bool" },
      { name: "create_user_events", type: "bool" },
      { name: "manage_user_roles", type: "bool" },
      { name: "manage_exam_results", type: "bool" },
      { name: "shopping", type: "bool" },
      { name: "create_products", type: "bool" },
    ],
  },
  {
    name: "Products",
    columns: [
      { name: "title", type: "string", notNull: true, defaultValue: "" },
      { name: "description", type: "text" },
      { name: "price", type: "float", notNull: true, defaultValue: "0" },
      { name: "student_price", type: "float" },
    ],
  },
  {
    name: "Transactions",
    columns: [
      { name: "user", type: "link", link: { table: "User" } },
      {
        name: "transaction_timestamp",
        type: "datetime",
        notNull: true,
        defaultValue: "2022-12-12T23:07:27.759Z",
      },
      { name: "cart_json", type: "text", notNull: true, defaultValue: "[]" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type User = InferredTypes["User"];
export type UserRecord = User & XataRecord;

export type Student = InferredTypes["Student"];
export type StudentRecord = Student & XataRecord;

export type LoginStats = InferredTypes["loginStats"];
export type LoginStatsRecord = LoginStats & XataRecord;

export type ExamResult = InferredTypes["examResult"];
export type ExamResultRecord = ExamResult & XataRecord;

export type Modules = InferredTypes["Modules"];
export type ModulesRecord = Modules & XataRecord;

export type Events = InferredTypes["events"];
export type EventsRecord = Events & XataRecord;

export type RolePermission = InferredTypes["rolePermission"];
export type RolePermissionRecord = RolePermission & XataRecord;

export type Products = InferredTypes["Products"];
export type ProductsRecord = Products & XataRecord;

export type Transactions = InferredTypes["Transactions"];
export type TransactionsRecord = Transactions & XataRecord;

export type DatabaseSchema = {
  User: UserRecord;
  Student: StudentRecord;
  loginStats: LoginStatsRecord;
  examResult: ExamResultRecord;
  Modules: ModulesRecord;
  events: EventsRecord;
  rolePermission: RolePermissionRecord;
  Products: ProductsRecord;
  Transactions: TransactionsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://YuenSzeHong-s-workspace-jqrhkb.us-east-1.xata.sh/db/com3102-project-db",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
