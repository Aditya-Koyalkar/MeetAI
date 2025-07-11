import { z } from "zod";
import { db } from "@/db";
import { agents, meetings } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure, premiumProcedure } from "@/trpc/init";
import { agentsInsertSchema, agentsUpdateSchema } from "../schemas";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE, MIN_PAGE_SIZE } from "@/constants";
import { TRPCError } from "@trpc/server";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`COALESCE(COUNT(${meetings.id}), 0)`.as("meetingCount"),
        })
        .from(agents)
        .leftJoin(meetings, eq(agents.id, meetings.agentId))
        .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)))
        .groupBy(agents.id);
      if (!existingAgent) {
        throw new TRPCError({ code: "NOT_FOUND", message: "Agent not found" });
      }
      return existingAgent;
    }),
  getMany: protectedProcedure
    .input(
      z.object({
        page: z.number().default(DEFAULT_PAGE),
        pageSize: z.number().min(MIN_PAGE_SIZE).max(MAX_PAGE_SIZE).default(DEFAULT_PAGE_SIZE),
        search: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, search } = input;
      const data = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`COALESCE(COUNT(${meetings.id}), 0)`.as("meetingCount"),
        })
        .from(agents)
        .leftJoin(meetings, eq(agents.id, meetings.agentId))
        .where(and(eq(agents.userId, ctx.auth.user.id), search ? ilike(agents.name, `%${input.search}%`) : undefined))
        .groupBy(agents.id)
        .orderBy(desc(agents.createdAt), desc(agents.id))
        .limit(pageSize)
        .offset((page - 1) * pageSize);

      const total = await db
        .select({ count: count() })
        .from(agents)
        .where(and(eq(agents.userId, ctx.auth.user.id), search ? ilike(agents.name, `%${input.search}%`) : undefined));
      const totalPages = Math.ceil(total[0].count / pageSize);
      return {
        items: data,
        total: total[0].count,
        totalPages,
      };
    }),
  create: premiumProcedure("agents")
    .input(agentsInsertSchema)
    .mutation(async ({ ctx, input }) => {
      const { user } = ctx.auth;
      const [createdAgent] = await db
        .insert(agents)
        .values({
          ...input,
          userId: user.id,
        })
        .returning();
      return createdAgent;
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const [removedAgent] = await db
        .delete(agents)
        .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)))
        .returning();
      if (!removedAgent) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Agent not found",
        });
      }
      return removedAgent;
    }),
  update: protectedProcedure.input(agentsUpdateSchema).mutation(async ({ ctx, input }) => {
    const [updatedAgent] = await db
      .update(agents)
      .set(input)
      .where(and(eq(agents.id, input.id), eq(agents.userId, ctx.auth.user.id)))
      .returning();
    if (!updatedAgent) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "Agent not found",
      });
    }
    return updatedAgent;
  }),
});
