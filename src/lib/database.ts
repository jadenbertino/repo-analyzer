import { z } from 'zod'
import * as _ from './_database'

const CodeHighlightSchema = {
  Row: _.publicCodeHighlightRowSchema,
  Insert: _.publicCodeHighlightInsertSchema,
  Update: _.publicCodeHighlightUpdateSchema,
  Relationships: _.publicCodeHighlightRelationshipsSchema,
}
type CodeHighlight = z.infer<typeof CodeHighlightSchema.Row>

const CodeIssueSchema = {
  Row: _.publicCodeIssueRowSchema,
  Insert: _.publicCodeIssueInsertSchema,
  Update: _.publicCodeIssueUpdateSchema,
  Relationships: _.publicCodeIssueRelationshipsSchema,
}
type CodeIssue = z.infer<typeof CodeIssueSchema.Row>

const RepoSchema = {
  Row: _.publicRepoRowSchema,
  Insert: _.publicRepoInsertSchema,
  Update: _.publicRepoUpdateSchema,
  Relationships: _.publicRepoRelationshipsSchema,
}
type Repo = z.infer<typeof RepoSchema.Row>

const UserSchema = {
  Row: _.publicUserRowSchema,
  Insert: _.publicUserInsertSchema,
  Update: _.publicUserUpdateSchema,
}
type User = z.infer<typeof UserSchema.Row>

// Schema exports
export { CodeHighlightSchema, CodeIssueSchema, RepoSchema, UserSchema }

// Type exports
export type { CodeHighlight, CodeIssue, Repo, User }
