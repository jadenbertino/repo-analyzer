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
type CodeHighlightRow = z.infer<typeof CodeHighlightSchema.Row>
type CodeHighlightInsert = z.infer<typeof CodeHighlightSchema.Insert>
type CodeHighlightUpdate = z.infer<typeof CodeHighlightSchema.Update>
type CodeHighlightRelationships = z.infer<
  typeof CodeHighlightSchema.Relationships
>

const CodeIssueSchema = {
  Row: _.publicCodeIssueRowSchema,
  Insert: _.publicCodeIssueInsertSchema,
  Update: _.publicCodeIssueUpdateSchema,
  Relationships: _.publicCodeIssueRelationshipsSchema,
}
type CodeIssueRow = z.infer<typeof CodeIssueSchema.Row>
type CodeIssueInsert = z.infer<typeof CodeIssueSchema.Insert>
type CodeIssueUpdate = z.infer<typeof CodeIssueSchema.Update>
type CodeIssueRelationships = z.infer<typeof CodeIssueSchema.Relationships>

const RepoSchema = {
  Row: _.publicRepoRowSchema,
  Insert: _.publicRepoInsertSchema,
  Update: _.publicRepoUpdateSchema,
}
type RepoRow = z.infer<typeof RepoSchema.Row>
type RepoInsert = z.infer<typeof RepoSchema.Insert>
type RepoUpdate = z.infer<typeof RepoSchema.Update>

// =============================================
// ENUM SCHEMAS
// =============================================

const RepoStatusSchema = _.publicRepoStatusSchema
type RepoStatus = z.infer<typeof RepoStatusSchema>

// =============================================
// EXPORTS
// =============================================

export { CodeHighlightSchema, CodeIssueSchema, RepoSchema, RepoStatusSchema }
export type {
  CodeHighlightRow,
  CodeHighlightInsert,
  CodeHighlightUpdate,
  CodeHighlightRelationships,
  CodeIssueRow,
  CodeIssueInsert,
  CodeIssueUpdate,
  CodeIssueRelationships,
  RepoRow,
  RepoInsert,
  RepoUpdate,
  RepoStatus,
}
