import { z } from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { eq, getTableColumns, sql } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [existingAgent] = await db
        .select({
          ...getTableColumns(agents),
          meetingCount: sql<number>`5`,
        })
        .from(agents)
        .where(eq(agents.id, input.id));
      return existingAgent;
    }),
  getMany: protectedProcedure.query(async () => {
    const data = await db
      .select({
        ...getTableColumns(agents),
        meetingCount: sql<number>`5`,
      })
      .from(agents);
    return data;
  }),
  create: protectedProcedure.input(agentsInsertSchema).mutation(async ({ ctx, input }) => {
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
});
