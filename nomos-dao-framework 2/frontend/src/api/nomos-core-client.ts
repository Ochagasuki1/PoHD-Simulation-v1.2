/**
 * Nomos Core API Client
 * 
 * Lightweight API client module for interfacing with the nomos-core backend canister.
 * This module provides a clean abstraction layer for all backend interactions.
 */

import type { backendInterface, DaoInfo, EngineInfo, UserProfile, VoteRecord, ApiConnector, Layer2Output, Layer3Data } from '../backend';
import { UserRole } from '../backend';

export class NomosCoreClient {
  private actor: backendInterface | null = null;

  constructor(actor: backendInterface | null) {
    this.actor = actor;
  }

  /**
   * Update the actor instance
   */
  setActor(actor: backendInterface | null) {
    this.actor = actor;
  }

  /**
   * Check if the client is ready
   */
  isReady(): boolean {
    return this.actor !== null;
  }

  // ==================== User Profile Operations ====================

  async getCallerUserProfile(): Promise<UserProfile | null> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getCallerUserProfile();
  }

  async saveCallerUserProfile(profile: UserProfile): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.saveCallerUserProfile(profile);
  }

  async getCallerUserRole(): Promise<UserRole> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getCallerUserRole();
  }

  async isCallerAdmin(): Promise<boolean> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.isCallerAdmin();
  }

  // ==================== DAO Operations ====================

  async getDaoInfo(): Promise<DaoInfo | null> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getDaoInfo();
  }

  async setDaoInfo(info: DaoInfo): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.setDaoInfo(info);
  }

  // ==================== Engine Operations ====================

  async getAvailableEngines(): Promise<EngineInfo[]> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getAvailableEngines();
  }

  async getActiveEngine(): Promise<EngineInfo | null> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getActiveEngine();
  }

  async addEngine(engine: EngineInfo): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.addEngine(engine);
  }

  async setActiveEngine(engineId: string): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.setActiveEngine(engineId);
  }

  // ==================== Vote Operations ====================

  async getVoteHistory(proposalId: string): Promise<VoteRecord[]> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getVoteHistory(proposalId);
  }

  async addVoteRecord(proposalId: string, vote: boolean): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.addVoteRecord(proposalId, vote);
  }

  // ==================== API Connector Operations ====================

  async getApiConnectorsByEngine(engineId: string): Promise<ApiConnector[]> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getApiConnectorsByEngine(engineId);
  }

  async addApiConnector(connector: ApiConnector): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.addApiConnector(connector);
  }

  async updateApiConnectorAuth(id: string, newToken: string): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.updateApiConnectorAuth(id, newToken);
  }

  async getTikTokConnectorTemplate(): Promise<ApiConnector> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getTikTokConnectorTemplate();
  }

  // ==================== Layer 2 Operations ====================

  async getLayer2Outputs(): Promise<Layer2Output[]> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getLayer2Outputs();
  }

  async addLayer2Output(output: Layer2Output): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.addLayer2Output(output);
  }

  // ==================== Layer 3 Operations ====================

  async getLayer3Data(): Promise<Layer3Data | null> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.getLayer3Data();
  }

  async setLayer3Data(data: Layer3Data): Promise<void> {
    if (!this.actor) throw new Error('Actor not initialized');
    return this.actor.setLayer3Data(data);
  }
}

// Singleton instance
let clientInstance: NomosCoreClient | null = null;

/**
 * Get the singleton NomosCoreClient instance
 */
export function getNomosCoreClient(actor?: backendInterface | null): NomosCoreClient {
  if (!clientInstance) {
    clientInstance = new NomosCoreClient(actor || null);
  } else if (actor !== undefined) {
    clientInstance.setActor(actor);
  }
  return clientInstance;
}
