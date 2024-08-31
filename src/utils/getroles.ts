import { DatabaseService } from 'src/database/database.service';

export async function getAllRoles(
  databaseService: DatabaseService,
  userId: number,
  posteId: number,
): Promise<string[]> {
  const postRoles = await databaseService.role.findMany({
    where: { posteRoles: { some: { posteId } } },
    select: { name: true },
  });

  const extraRoles = await databaseService.role.findMany({
    where: { extraUsers: { some: { userId } } },
    select: { name: true },
  });

  return [...new Set([...postRoles, ...extraRoles].map((role) => role.name))];
}
