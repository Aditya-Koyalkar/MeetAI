import { z } from "zod";
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { agentsInsertSchema } from "../schemas";
import { eq } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
  getOne: baseProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ input }) => {
      const [existingAgent] = await db.select().from(agents).where(eq(agents.id, input.id));
      return existingAgent;
    }),
  getMany: baseProcedure.query(async () => {
    const data = await db.select().from(agents);
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
