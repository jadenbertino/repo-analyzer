import { z } from 'zod'
import * as _ from './_database'

// =============================================
// TABLE SCHEMAS
// =============================================

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
}
type Repo = z.infer<typeof RepoSchema.Row>

// =============================================
// ENUM SCHEMAS
// =============================================

const RepoStatusSchema = _.publicRepoStatusSchema
type RepoStatus = z.infer<typeof RepoStatusSchema>

// =============================================
// EXPORTS
// =============================================

export { CodeHighlightSchema, CodeIssueSchema, RepoSchema, RepoStatusSchema }

export type { CodeHighlight, CodeIssue, Repo, RepoStatus }
