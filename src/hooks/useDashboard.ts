import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

// ---Fetch User Profile (Points & Streak) ---
export function useProfile() {
    const { user } = useAuth();

    return useQuery({
        // Refreshes when user ID changes
        queryKey: ['profile', user?.id],

        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user?.id)
                .single();

            if (error) throw error;
            return data;
        },
        enabled: !!user,
    });
}

// --- Fetch Rewards List ---
export function useRewards() {
    return useQuery({
        queryKey: ['rewards'],
        queryFn: async () => {
            await new Promise(resolve => setTimeout(resolve, 3000));
            const { data, error } = await supabase
                .from('rewards')
                .select('*')
                .order('cost', { ascending: true });

            if (error) throw error;
            return data;
        },
    });
}

// ---Claim Daily Streak ---
export function useDailyCheckIn() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async () => {
            const { data, error } = await supabase.rpc('claim_daily_streak');
            if (error) throw error;
            return data;
        },
        onSuccess: (data) => {
            if (data.success) {
                toast.success(`+${data.new_balance} Points!`);
                queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
            } else {
                toast.error(data.message);
            }
        },
        onError: (error: any) => {
            toast.error(error.message);
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
        }
    });
}

// ---Redeem Reward ---
export function useRedeemReward() {
    const queryClient = useQueryClient();
    const { user } = useAuth();

    return useMutation({
        mutationFn: async (rewardId: number) => {
            const { data, error } = await supabase
                .rpc('redeem_reward', { reward_id: rewardId });

            if (error) throw error;
            if (!data.success) throw new Error(data.message);
            return data;
        },
        onSuccess: () => {
            toast.success('Reward Redeemed!');
            // Update points automatically
            queryClient.invalidateQueries({ queryKey: ['profile', user?.id] });
        },
        onError: (error: Error) => {
            toast.error(error.message);
        }
    });
}