/**
 * 通用响应格式
 * 所有后端接口统一返回：{ code: number; data: T; message: string }
 */
export interface ApiResponse<T = unknown> {
  /** 业务状态码，0 通常表示成功，其它为错误 */
  code: number;
  /** 真实业务数据 */
  data: T;
  /** 文本提示信息（成功或错误描述） */
  message: string;
}

/**
 * 登录请求参数
 * 对应接口：POST /login
 */
export interface LoginRequest {
  /** 用户名 */
  username: string;
  /** 密码（明文或加密后，视后端约定而定） */
  password: string;
  /** 是否记住登录状态，可选 */
  remember?: boolean;
}

/**
 * 用户列表分页查询参数
 * 对应接口：GET /users 或类似
 */
export interface UserListQuery {
  /** 当前页码，从 1 开始 */
  page: number;
  /** 每页条数 */
  size: number;
  /** 关键字搜索（例如按姓名/账号模糊匹配），可选 */
  keyword?: string;
}

/**
 * 单个用户基础信息
 * 用于列表场景
 */
export interface UserItem {
  /** 用户唯一标识 */
  id: number;
  /** 用户名称 */
  name: string;
  /** 头像地址（URL） */
  avatar: string;
  /** 创建时间，字符串格式（通常为 ISO 时间或后端自定义格式） */
  createTime: string;
}

/**
 * 用户列表分页数据结构
 * data 字段的内部结构：{ list: UserItem[]; total: number; page: number; size: number }
 */
export interface UserListData {
  /** 当前页用户列表 */
  list: UserItem[];
  /** 总用户数量 */
  total: number;
  /** 当前页码 */
  page: number;
  /** 每页条数 */
  size: number;
}

/**
 * 用户列表接口返回结构
 * 对应完整返回：{ code, data: { list, total, page, size }, message }
 */
export type UserListResponse = ApiResponse<UserListData>;

/**
 * 登录接口返回结构示例
 * 如果登录返回的是用户信息或 token，可以按需替换 LoginData 的定义
 */
export interface LoginData {
  /** 例如：访问令牌 */
  token: string;
  /** 例如：当前登录的用户信息 */
  user?: UserItem;
}

/** 登录接口返回：{ code, data: LoginData, message } */
export type LoginResponse = ApiResponse<LoginData>;