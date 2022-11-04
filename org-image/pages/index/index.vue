<template>
	<view>
		<view style="display: flex;justify-content: center;flex-wrap: wrap;">
			默认图片选择临时存储，存储在应用内

			<view class="item" style="height: 80rpx;">
				1.头像
				<org-image src="https://timgsa.baidu.com/" :size="{width:'80rpx',height:'80rpx'}" :is-circle="true"></org-image>
			</view>
			<view class="line"></view>

			<view class="item" style="width: 100vw;text-align: center;">
				2.使用网路地址（正常显示）
				<org-image :src="src" :size="{width:'500rpx',height:'500rpx'}" :is-circle="false"></org-image>
			</view>
			<view class="line"></view>
			<view class="item" style="width: 500rpx;">
				3.图片出错，使用默认图片（图片会占据对应的位置，保持设置的大小，并居中）
				<org-image src="https://timgsa.baidu.com/" :size="{width:'500rpx',height:'500rpx'}" :is-circle="false" :css="{'background':'#dedede'}"></org-image>
			</view>
			<view class="line"></view>
			<view class="item" style="width: 500rpx;">
				4.设置图片存储为永久存储(h5端会自动存储为临时缓存)
				<org-image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584594805820&di=1eb66418d4ab3b7cf696fa9ecc82a81f&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D583874135%2C70653437%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D3607%26h%3D2408"
				 :size="{width:'500rpx',height:'500rpx'}" :is-circle="false" :cache-type="-1"></org-image>
			</view>
			<view class="line"></view>
			<view class="item" style="width: 100vw;padding: 20rpx;">
				<view @tap="getTemp">
					获取缓存的信息（应用内缓存的信息）
					<view v-for="(it,key ,index) in temporaryList" :key="index">
						{{key}}:{{it}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import storage from '../../API/storage-cache.js';

	import orgImage from '../../components/org-image/org-image';
	export default {
		data() {
			return {
				title: 'Hello',
				src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1584594805820&di=1eb66418d4ab3b7cf696fa9ecc82a81f&imgtype=0&src=http%3A%2F%2Ft9.baidu.com%2Fit%2Fu%3D583874135%2C70653437%26fm%3D79%26app%3D86%26f%3DJPEG%3Fw%3D3607%26h%3D2408',
				temporaryList: {}

			}
		},
		components: {
			orgImage
		},
		onLoad() {

		},
		methods: {
			/**
			 * 这里只获取应用内缓存的信息，缓存到手机中的图片，请使用 uni相关api获取
			 */
			getTemp() {
				this.temporaryList = storage.temporary.getAll();
			}
		}
	}
</script>

<style>
	.line {
		width: 100%;
		line-height: 60rpx;
		height: 160rpx;
	}

	.item {
		padding: 20rpx;
		line-height: 60rpx;
	}
</style>
